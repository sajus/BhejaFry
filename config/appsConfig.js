/**
 * Application configuration setup.
 * By default, Server listen on port 90; You can change it as per your requirements.
 */
module.exports = {
    "server": {
    	"dev": {
    		"port": 9000,
    		"uri": "localhost",
    		"codebase": "src"
    	},
    	"prod": {
    		"port": 90,
    		"uri": "localhost",
    		"codebase": "prod"
    	}
    },
    "database": {
        "name": "interview_db",
        "host": "root",
        "password": ""
    }
}