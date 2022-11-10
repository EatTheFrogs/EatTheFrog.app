pipeline {
    agent any
    environment {
        REPO_NAME = scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.git")[0].toLowerCase()
    }
    stages {
        stage ('Initialize') {
            steps {
                sh '''
                    echo PATH = ${PATH}
                    echo M2_HOME = ${M2_HOME}
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    echo Generating production build for "$REPO_NAME"
                    npm run build
                    echo Copying production build to html directory
                    cp -a ./build/. "$ETF_HTML_DIRECTORY"
                '''
            }
        }
        stage ('Clean up') {
            steps {
                cleanWs()
            }
        }
    }
}
