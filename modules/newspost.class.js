console.log("newspost.class.js loaded");
module.exports = class NewsPost {

  schema(){
    return {
      for_all: {type: String, required: true},
      for_education_id: {type: String, required: false},
      title: {type: String, required: true},
      content: {type: String, required: true},
      date_posted: {type: Number, required: true},
    };
  }
}

