rs
use std::io::prelude::*;
use std::net::TcpStream;
use std::net::TcpListener;

use std::fs;
use std::fs::File;

struct ServerConfig {
    host: String,
    port : String,
}

impl ServerConfig {
    fn address(&self) -> String {
        return format!("{0}:{1}", self.host, self.port);
    }
}

fn main() {
    let hos = String::from("127.0.0.1");
    let por = String::from("8080");

    let config = ServerConfig{ host:hos, port:por};
    let listener = TcpListener::bind(config.address()).unwrap();

    println!("{}", get_exec_path());

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 512];

    stream.read(&mut buffer).unwrap();

    //let mut file = File::open("hello.html").unwrap();
    //let mut contents = String::new();
    //file.read_to_string(&mut contents).unwrap();
    //let response = format!("HTTP/1.1 200 OK\r\n\r\n{}", contents);

    let response = format!("HTTP/1.1 200 OK\r\n\r\n{}", directory_content());

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();

    println!("Request: {}", String::from_utf8_lossy(&buffer[..]));
}

fn directory_content() -> String {
    let paths = fs::read_dir("").unwrap();
    let content = String::from("");
    for path in paths {
        format!("{0}{1}\n", content, path.unwrap().path().display());
        //println!("Name: {}", path.unwrap().path().display())
    }
    println!("Content:\n{}\nEnd\n", content);
    return content;
}

fn get_exec_name() -> String {
    let opt = std::env::current_exe()
        .ok()
        .and_then(|pb| pb.file_name().map(|s| s.to_os_string()))
        .and_then(|s| s.into_string().ok());
    format!("{}",opt.as_ref().map(|x| &**x).unwrap_or("null"))
}

fn get_exec_path() -> String {
    format!("{}\\", std::env::current_dir().ok().unwrap().to_str().unwrap())
}

/*
fn get_exec_path() -> &'static str {
    let full = get_exec_path_full();
    full.trim_left_matches(get_exec_name().unwrap().as_str())
}*/
