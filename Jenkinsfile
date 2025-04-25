pipeline {
    agent any

    environment {
        IMAGE_NAME = 'imhrkr/imhr-frontend'
        IMAGE_TAG  = "1.${BUILD_NUMBER}"
    }

    stages {

         stage('Clean up directory') {
            steps {
                script {
                    sh 'rm -rf ./* ./.git'
                }
            }
        }

        stage('Clone Repository') {
            steps {
                // Git 리포지토리 클론
                echo "Cloning Repository..."
                git branch: 'main', url: 'https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE.git'
            }
        }

        stage('Npm Run Build') {
            steps {
                echo "install"
                sh 'npm install'

                echo "Build"
                sh 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'IMHR_DOCKER_HUB', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                    sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Edit Manifest') {
            steps {
                script{
                    echo "Editing Manifest..."
                    sh 'cd ..'
                    sh 'git checkout -f deploy/argo/cd'

                    sh """
                    cd deploy
                    sed -i 's/:1\\.[0-9]\\+/:${IMAGE_TAG}/g' frontend-rollout.yml
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script{
                    echo "Deploying Components..."
                    withCredentials([
                           usernamePassword(credentialsId: 'IUCH_GIT', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_PASSWORD'),
//                            string(credentialsId: 'github_username', variable: 'GITHUB_USERNAME'),
//                            string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN'),
                           string(credentialsId: 'IMHR_FRONT_GIT_URL', variable: 'GITHUB_URL')
                       ]) {
                          sh """
                          git add .
                          git commit -m "[Deploy] v1.${BUILD_NUMBER} 배포"
                          echo "after commit"
                          git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@${GITHUB_URL}
                          echo "after seturl"
                          git push origin deploy/argo/cd
                          """
                    }
                }
            }
        }
    }
}
