genericPipeline {
  // deployable branch name regex is matching following patterns
  //   1.x
  //   11.x
  //   22.x
  //   11.2.x
  //   11.11.x
  //   1.X
  //   11.X
  //   112.22.X
  deployableBranchRegex = /^(\d+.){1,2}x$/
  deployableBranches = [ 'master', 'beta', 'next', 'alpha' ]
  isBranchDeployable = (branchName in deployableBranches) || (branchName ==~ deployableBranchRegex)

  skipBuildJobOnKeyword = '[skip-ci]'

  checkoutAdditionalCommand = {
    withCredentials([file(credentialsId: 'npmrc.eleven-dev', variable: 'NPMRC')]) {
      sh '''
        mv $NPMRC ~/.npmrc
      '''
    }
  }

  buildCommand = {
    sh '''
      ./install.sh
      yarn lint
      yarn format:check
    '''
    if (!isPR && isBranchDeployable){
      sh 'yarn build && yarn static-prod:storybook'
    } else {
      sh 'yarn build && yarn static-dev:storybook'
    }
  }

  unitTestCommand = {
    sh 'yarn test:translation'
    sh 'yarn test:sass:build'
    sh 'yarn test'
    withCredentials([string(credentialsId: 'chromatic-token', variable: 'CHROMATIC_TOKEN')]) {
      sh 'yarn chromatic --project-token ${CHROMATIC_TOKEN} --branch-name ${CHANGE_BRANCH}'
    }
  }

  qualityGateEnabled = false;
  sonarQubeEnabled = isPR || isBranchDeployable

  sonarQubeServerName = "TeleTrexSonarQube"
  qualityGateTimeoutMinute = 60

  sonarQubeAdditionalProperties = {
    if (isPR) {
      [
        "sonar.java.binaries":env.WORKSPACE,
        "sonar.sources":env.WORKSPACE,
        "sonar.pullrequest.key": env.CHANGE_ID,
        "sonar.pullrequest.branch": env.CHANGE_BRANCH,
        "sonar.pullrequest.base": env.CHANGE_TARGET,
        "sonar.inclusions":"src/components/**/*.js,src/**/*.test.jsx",
        "sonar.javascript.lcov.reportPaths":env.WORKSPACE+"/coverage/lcov.info"
      ]
    }
    else {
      [
        "sonar.java.binaries":env.WORKSPACE,
        "sonar.sources":env.WORKSPACE,
        "sonar.branch.name": branchName,
        "sonar.inclusions":"src/components/**/*.js,src/components/**/*.jsx",
        "sonar.exclusions":"src/**/*.story.jsx, src/**/*.story.js, src/**/stories/*.jsx, src/**/stories/*.js, src/**/*.test.js, src/**/*.test.jsx",
        "sonar.javascript.lcov.reportPaths":env.WORKSPACE+"/coverage/lcov.info"
      ]
    }
    
  }

  uploadArtifactEnabled = !isPR
  uploadArtifactCommand = {
    if (isBranchDeployable) {
      sh "rm -f .env.semantic.release"

      withCredentials([[
        $class: 'UsernamePasswordMultiBinding',
        credentialsId: scmCredential,
        usernameVariable: 'GIT_USERNAME',
        passwordVariable: 'GIT_PASSWORD'
      ]]) {
        env.scmAutomationUserName = scmAutomationUserName
        env.scmAutomationUserEmail = scmAutomationUserEmail
        env.GIT_CREDENTIALS = "${env.GIT_USERNAME}:${env.GIT_PASSWORD}"
        sh "git config credential.username ${env.GIT_USERNAME}"
        sh "git config credential.helper '!f() { echo password=\$GIT_PASSWORD; }; f'"
        sh "git config user.name ${env.scmAutomationUserName}"
        sh "git config user.email ${env.scmAutomationUserEmail}"
        sh "yarn semantic-release"
      }

      // check if we have a release at upload of artifact
      if (fileExists('.env.semantic.release')) {
        load ".env.semantic.release"
        println  env.projectVersion
        deployStaticResourcesEnabled = true
        dir(".storybook") {
          sh "npm --no-git-tag-version version " +  env.projectVersion
          if(branchName == 'master') {
            sh "npm publish"
          } else {
            sh "npm publish --tag beta"
          }
        }
      }
    }
  }

  deployStaticResourcesEnabled = false
  deployStaticResourcesProduct = "eleven"
  deployStaticResourcesModuleName = "@eleven/eleven-storybook"
  deployStaticResourcesVersion = {"${env.projectVersion}"}
  deployStaticResourcesSource = "build"
}
