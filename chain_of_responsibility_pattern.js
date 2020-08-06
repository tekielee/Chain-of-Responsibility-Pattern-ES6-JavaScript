class Logger {
	constructor() {
		this.INFO = 1;
		this.DEBUG = 2;
		this.ERROR = 3;
		this.level;
		this.nextLogger;
	}
	
	setNextLogger(nextLogger) {
		this.nextLogger = nextLogger;
		//console.log(this.nextLogger);
	}
	
	logMessage(level, message) {
		if(this.level <= level) {
			this.write(message);
		}
		
		if(this.nextLogger != null) {
			this.nextLogger.logMessage(level, message);
		}
	}
	
	getINFO() {
		return this.INFO;
	}
	
	getDEBUG() {
		return this.DEBUG;
	}
	
	getERROR() {
		return this.ERROR;
	}
	
	write(message) {}
}

class ConsoleLogger extends Logger {
	constructor(level) {
		super();
		this.level = level;
	}
	
	write(message) {
		console.log('Standard Console::Logger: ' + message);
	}
}

class ErrorLogger extends Logger {
	constructor(level) {
		super();
		this.level = level;
	}
	
	write(message) {
		console.log('Error Console::Logger: ' + message);
	}
}

class FileLogger extends Logger {
	constructor(level) {
		super();
		this.level = level;
	}
	
	write(message) {
		console.log('File::Logger: ' + message);
	}
}

const errorLogger = new ErrorLogger(new Logger().getERROR());
const fileLogger = new FileLogger(new Logger().getDEBUG());
const consoleLogger = new ConsoleLogger(new Logger().getINFO());

errorLogger.setNextLogger(fileLogger);
fileLogger.setNextLogger(consoleLogger);

//console.log(loggerChain);

errorLogger.logMessage(new Logger().getINFO(), 'This is an information.');
errorLogger.logMessage(new Logger().getDEBUG(), 'This is a debug level information.');
errorLogger.logMessage(new Logger().getERROR(), 'This is an error information.');
