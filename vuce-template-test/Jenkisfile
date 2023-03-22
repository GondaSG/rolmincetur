@Library('jenkins-library@master')_

pipeline {
    agent {
    	label 'agent-1'
    }
	tools {
        oc 'oc'
    }
	
	parameters {
        booleanParam(name: 'REDEPLOY', defaultValue: false)
    }

    environment {
        SRC_PROJECT 	= 'vuce-notificaciones-api-app'
        SRC_REPO_URL 	= "${GIT_SERVER}/mincetur/notificaciones/backend"
        SVC_FOLDER		= 'desa'
        SVC_NAME		= 'vuce-notificaciones-api-app'
        ENVIRONMENT 	= 'desarrollo'
        BRANCH 			= 'master'
		REGISTRY_SERVER = "${REGISTRY_OCP_DEV_SERVER}"
		CLUSTER_NAME    = 'openshift_desa'
		PROJECT_NAME    = 'TBD'    
    }
    stages {

    	stage ('Prepare') {
            steps {
				script {
					checkoutGit( kind: 'proyect', repository: SRC_REPO_URL,
							     source: SRC_PROJECT, branch: BRANCH ) 
				}	
            }
        }

        stage ('Build') {
            steps {
				script {
					gradle(kind:'build',version:'7-jdk11',source: SRC_PROJECT) 
				}	
            }
        }

        stage ('Sonarqube analysis') {
        	environment {
                scannerHome = tool 'sonarqube-scanner'
            }
            steps {
				script {
					sonarqube(kind:'analyzeJava',projectKey: SVC_NAME, projectName: SRC_PROJECT) 
				}	
            }
        }

	    stage ('Publish Openshift Image') {
	        steps {
				script {
					containerOCP( kind:'artefactPrepare', source: SRC_PROJECT, 
						environment: ENVIRONMENT, svcFolderName: SVC_FOLDER)

		    		containerOCP( kind:'publish', source: SRC_PROJECT, environment: ENVIRONMENT, 
						svcFolderName: SVC_FOLDER, svcName: SVC_NAME, project: PROJECT_NAME)
				}
				
		    }
	    }

	    stage ('Deploy Openshift Containers') {
	        steps {
				script {
					ocp( kind:'deploy', environment: ENVIRONMENT, svcFolderName: SVC_FOLDER, 
						 svcName: SVC_NAME, project: PROJECT_NAME, recreate: REDEPLOY )
				}
				
		    }
	    }

    }
	post {
	    always {
		    cleanWs()
	    }
    }
}
