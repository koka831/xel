extern crate num;
extern crate serde;
extern crate serde_json;
#[macro_use] extern crate serde_derive;


use std::fs::File;
use std::io::prelude::*;

use num::traits::FromPrimitive;

#[derive(Debug, Serialize, Deserialize)]
pub enum XelColor {
    None = 0,
    Black = 1,
    Red = 2,
    Green = 3,
    Yellow = 4,
    Blue = 5,
    Purple = 6,
    Cyan = 7,
    White = 8,
}

/// TODO: for now not sure how to deseialize from enum::value 
impl FromPrimitive for XelColor {
    fn from_i64(n: i64) -> Option<XelColor> {
        match n {
            1 => Some(XelColor::Black),
            2 => Some(XelColor::Red),
            3 => Some(XelColor::Green),
            4 => Some(XelColor::Yellow),
            5 => Some(XelColor::Blue),
            6 => Some(XelColor::Purple),
            7 => Some(XelColor::Cyan),
            8 => Some(XelColor::White),
            _ => Some(XelColor::None),
        }
    }

    fn from_u64(n: u64) -> Option<XelColor> {
        match n {
            1 => Some(XelColor::Black),
            2 => Some(XelColor::Red),
            3 => Some(XelColor::Green),
            4 => Some(XelColor::Yellow),
            5 => Some(XelColor::Blue),
            6 => Some(XelColor::Purple),
            7 => Some(XelColor::Cyan),
            8 => Some(XelColor::White),
            _ => Some(XelColor::None),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Xel {
    pub width: usize,
    pub height: usize,
    pub dots: Vec<Vec<XelColor>>,
}

impl Xel {
    pub fn from_file(fname: String) -> Result<Xel, String> {
        match File::open(fname) {
            Err(e) => Err(e.to_string()),
            Ok(mut f) => {
                let mut buf = String::new();
                f.read_to_string(&mut buf).unwrap();
                let xel = serde_json::from_str::<Xel>(&mut buf).unwrap();
                Ok(xel)
            },
        }
    }
}

#[test]
fn test_init() { /// cargo test -- --nocapture to use println! in test
    //let xel = Xel::from_file("./src/example/invader.json".to_string());
    //println!("{:?}", xel);
    println!("hoge");

}

#[test]
fn test_decode() {
    let js = r#"{
  "width": 11,
  "height": 8,
  "dots": [
    ["Black", "Black", "None"],
    ["Black", "Black", "None"]
  ]
}"#;
        let _v: Xel = serde_json::from_str(js).unwrap();
    println!("{:?}", js);
}


#[test]
#[should_panic] // for now
fn test_decode_from_primitive() {
    let js = r#"{
  "width": 11,
  "height": 8,
  "dots": [
    ["0", 1, 2, 3],
    [2, 3, 4, 5]
  ]
}"#;
        let _v: Xel = serde_json::from_str(js).unwrap();
    println!("{:?}", js);
}
