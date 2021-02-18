 class Logger {
  constructor() {
    // the idea for this class it centralize logger config 
    // where and how to print it
    // on this sample project, it simply used console.log
  }

  info(data) {
    console.log(`[${new Date().toLocaleString()}] INFO ${data}`)
  }

  error(data) {    
    console.log(`[${new Date().toLocaleString()}] ERROR ${data}`)
  }

  warn(data) {    
    console.log(`[${new Date().toLocaleString()}] WARN ${data}`)
  }
}

const instance = new Logger()

export default instance