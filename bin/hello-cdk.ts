import cdk = require('@aws-cdk/cdk');
import s3 = require('@aws-cdk/aws-s3');
import configurator = require('../lib/configurator');
import { ProjectConfig } from '../lib/configurator';

export class HelloCdkStack extends cdk.Stack {
    config = new configurator.Config({cwd: process.cwd()});
  
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // let a :string = 'hi';
    
        let projectConfig: ProjectConfig = this.config.getProjectConfig();
        console.log(projectConfig);
    
        new s3.Bucket(this, 'MyFirstBucket', {
            versioned: true
        });
    }
}

const app = new cdk.App();
new HelloCdkStack(app, 'HelloCdkStack');
