import yaml = require('js-yaml');
var path = require('path');
import * as fs from 'fs';

export interface ProjectConfig {
    sourceRegion: string;
    sourceBucket?: string;
    applicationName?: string;
    projectName?: string;
    version?: string;
}

export interface Options {
    cwd?: string;
}

export class Config {
    name:string;
    config:any;
    options:any;

    constructor(options :Options) {
        // TODO: default options, e.g. cwd = cwd: process.cwd()
        this.options = options;
        this.getProjectConfig();
    }
    
    getConfig():object {
        this.config = this.readFilesSync(`${this.options.cwd}/config/`);
        return this.config;
    }
  
    getProjectConfig(): ProjectConfig {
        let ProjectConfig: ProjectConfig = { sourceRegion: 'ap-southeast-2'};
        // console.log(this.config);
        return ProjectConfig;
    }
  
    readFilesSync(dir :string):any {
        let config: any = {};
        // assumption that this is natural sort
        // because we want a predictable sort
        fs.readdirSync(dir).forEach(filename => {
            const name = path.parse(filename).name;
            const ext = path.parse(filename).ext;
            if (ext === '.yml') {
              let temp = yaml.safeLoad(fs.readFileSync(`${this.options.cwd}/config/${name}${ext}`, 'utf8'));
              config = {...config, ...temp }
            }
        });
    
        return config;
    }
}