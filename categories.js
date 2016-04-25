module.exports = {
    "webdesign":{
        "default":{
            "title": "Web Design- All",
            "short": "Web Design",
            "summary": "Stumped on how to design a beautiful site? This is for you.",
            "reqs": [" HTML/CSS Fundamentals "],
            "next":[
                ["Interactive Websites: "," Javascript "],
                ["Make It Easy To Use: "," User Experience "]
            ]
        },
        'subcat':{
            "color":{
                "title": "Web Design- Color",
                "short": "Color",
                "summary": "Make sure all the elements compliment each other",
                "reqs": [" HTML/CSS Fundamentals "],
                "next":[
                    ["Readable Text: "," Typography "],
                    ["Relationship Between Elements: "," Space "]
                ]
            },
            "typography":{
                "title": "Web Design- Typography",
                "short": "Typography",
                "summary": "Choose a font that is easily readable",
                "reqs": [" HTML/CSS Fundamentals "],
                "next":[
                    ["Distinguish Elements: "," Color "],
                    ["Relationship Between Elements: "," Space "]
                ]
            },
            "space":{
                "title": "Web Design- Space",
                "short": "Space",
                "summary": "Indicate which elements are related to each other",
                "reqs": [" HTML/CSS Fundamentals "],
                "next":[
                    ["Distinguish Elements: "," Color "],
                    ["Readable Text: "," Typography "],
                    ["Arrange Page's Content: "," Information Hierarchy "]
                ]
            },
            "information":{
                "title": "Web Design- Information Hierarchy",
                "short": "Hierarchy",
                "summary": "Arrange content for maximum readability",
                "reqs": [" Color "," Typography "," Space "],
                "next":[
                    ["Build A Mockup: "," Wireframing "]
                ]
            },
            "wireframing":{
                "title": "Web Design- Wireframing",
                "short": "Wireframing",
                "summary": "Build a mockup for testing or team members",
                "reqs": [" Color "," Typography "," Space ", " Information Hierarchy "],
                "next":[
                    ["Make It Easy To Use: "," User Experience "]
                ]
            }
        }
    },
    "userexperience":{
        "default":{
            "title": "User Experience- All",
            "short": "User Experience",
            "summary": "Make the lives of your users as easy as possible",
            "reqs": [" HTML/CSS Fundamentals ", " Javascript Fundamentals ", " jQuery "],
            "next":[
                ["Store Data For Your Site: "," Databases "]
            ]
        },
        'subcat':{
            "fundamentals":{
                "title": "User Experience- Fundamentals",
                "short": "Fundamentals",
                "summary": "Learn the basics of designing a logical user experience",
                "reqs": [" HTML/CSS Fundamentals ", " Javascript Fundamentals ", " jQuery "],
                "next":[
                    ["Show Your Site's Value: "," Landing Page "]
                ]
            },
            "research":{
                "title": "User Experience- Research",
                "short": "User Research",
                "summary": " Understand your user's needs before you build",
                "reqs": [" User Experience Fundamentals "],
                "next":[
                    ["Show Your Site's Value: "," Landing Page "],
                    ["Give Perfect Instructions: "," Microcopy "]
                ]
            },
            "landingpage":{
                "title": "User Experience- Landing Page",
                "short": "Landing Page",
                "summary": "Make sure that users understand the value on the first page",
                "reqs": [" User Experience Fundamentals "],
                "next":[
                    ["Get Users Hooked: "," Onboarding "]
                ]
            },
            "onboarding":{
                "title": "User Experience- Onboarding",
                "short": "Onboarding",
                "summary": "Keep your visitors interested while they learn more",
                "reqs": [" User Experience Fundamentals ", " Landing Page "],
                "next":[
                    ["Give Perfect Instructions: "," Microcopy "]
                ]
            },
            "microcopy":{
                "title": "User Experience- Microcopy",
                "short": "Microcopy",
                "summary": "Make sure your instructions are perfectly clear",
                "reqs": [" User Experience Fundamentals "],
                "next":[
                    ["Help Users Take Action: "," Conversion "]
                ]
            },
            "conversion":{
                "title": "User Experience- Conversion",
                "short": "Conversion",
                "summary": "Help users move through your site and find its value",
                "reqs": [" User Experience Fundamentals "],
                "next":[
                    ["Coming Soon!"]
                ]
            }
        }
    },
    "html":{
        "default":{
            "title": "HTML/CSS - All",
            "short": "HTML/CSS",
            "summary": "The building blocks of a website",
            "reqs": ["Just be an internet user!"],
            "next":[
                ["Interactive Websites: ", "JavaScript"]
            ]
        },
        'subcat':{
            "fundamentals":{
                "title": "HTML/CSS- Fundamentals",
                "short": "Fundamentals",
                "summary": "Take the first steps towards learning web development",
                "reqs": ["Just be an internet user!"],
                "next":[
                    ["Your First Project: ", "Build A Full Site"]
                ]
            },
            "fullsite":{
                "title": "HTML/CSS- Build First Site",
                "short": "Build A Site",
                "summary": "Build a basic website and start your portfolio",
                "reqs": ["HTML/CSS Fundamentals"],
                "next":[
                    ["Fit All Screen Sizes: ", "Responsive Web Design"]
                ]
            },
            "responsive":{
                "title": "HTML/CSS- Responsive Design",
                "short": "Responsive",
                "summary": "Make your website beautiful on all screen sizes",
                "reqs": ["Build A Full Site"],
                "next":[
                    ["Interactive Websites: ", "Javascript"]
                ]
            }
        }
    },
    "javascript":{
        "default":{
            "title": "Javascript- All",
            "short": "JavaScript",
            "summary": "Add interactive elements and build real-time web apps",
            "reqs": ["HTML/CSS Fundamentals"],
            "next":[
                ["Store Data For Your Site: ", "Databases"],
                ["Fit All Screen Sizes: ", "Responsive Web Design"]
            ]
        },
        'subcat':{
            "fundamentals":{
                "title": "Javascript- Fundamentals",
                "short": "Fundamentals",
                "summary": "Learn programming basics and then make your site more fun",
                "reqs": ["HTML/CSS Fundamentals"],
                "next":[
                    ["Interactive Site Elements: "," JQuery "],
                    ["Javascript For Back End: "," Node.js "],
                    ["Data Visualization: "," D3.js "]
                ]
            },
            "jquery":{
                "title": "Javascript- JQuery",
                "short": "jQuery",
                "summary": "Easily add interactive elements to your site",
                "reqs": ["HTML/CSS Fundamentals", " Javascript Fundamentals "],
                "next":[
                    ["Javascript For Back End: "," Node.js "],
                    ["Data Visualization: "," D3.js "],
                    ["Easily Connect Back And Front End: "," React "]
                ]
            },
            "node":{
                "title": "Javascript- Node.js",
                "short": "Node.js",
                "summary": "Javascript throughout your stack for modern web apps",
                "reqs": ["HTML/CSS Fundamentals", " Javascript Fundamentals "],
                "next":[
                    ["Interactive Site Elements: "," JQuery "],
                    ["Data Visualization: "," D3.js "],
                    ["Easily Connect Back And Front End: "," React "]
                ]
            },
            "d3":{
                "title": "Javascript- D3.js",
                "short": "D3.js",
                "summary": "The best data visualization library on the web",
                "reqs": ["HTML/CSS Fundamentals", " Javascript Fundamentals "],
                "next":[
                    ["Interactive Site Elements: "," JQuery "],
                    ["Javascript For Back End: "," Node.js "],
                    ["Easily Connect Back And Front End: "," React "]
                ]
            },
            "react":{
                "title": "Javascript- React.js",
                "short": "React.js",
                "summary": "Untangle your front-end with a MVC framework",
                "reqs": ["HTML/CSS Fundamentals", " Javascript Fundamentals ", " Node.js "],
                "next":[
                    ["Interactive Site Elements: "," JQuery "],
                    ["Data Visualization: "," D3.js "],
                    ["Store Data For Your Site: "," Databases "]
                ]
            }
        }
    },
    "databases":{
        "default":{
            "title": "Databases- All",
            "short": "Databases",
            "summary": "Store and manage data on your site",
            "reqs": [" Just be an internet user! "],
            "next":[
                ["Build Your Own Website: "," HTML/CSS "],
                ["Interactive Websites: "," Javascript "]
            ]
        },
        'subcat':{
            "fundamentals":{
                "title": "Databases- Fundamentals",
                "short": "Fundamentals",
                "summary": "Learn the basics of multiple popular relational databases",
                "reqs": [" Just be an internet user! "],
                "next":[
                    ["Business/Marketing Insights: "," Intro to Analytics "],
                    ["Design A Scalable Database: "," Database Management "]
                ]
            },
            "analytics":{
                "title": "Databases- Intro to Analytics",
                "short": "Analytics",
                "summary": "Create insights for business/marketing decisions",
                "reqs": [" Database Fundamentals "],
                "next":[
                    ["Design A Scalable Database: "," Database Management "]
                ]
            },
            "dbmgmt":{
                "title": "Databases- Management",
                "short": "Management",
                "summary": "Make sure you store all the appropriate info in a scalable way",
                "reqs": [" Database Fundamentals "],
                "next":[
                    ["Business/Marketing Insights: "," Intro to Analytics "]
                ]
            }
        }
    }
}