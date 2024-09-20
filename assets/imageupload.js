import { AdvancedImage, upload } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dqljmx6ai'
  },
  url: {
    secure: true
  }
});

const options = {
  upload_preset: 'npzzdrdsnjjjjjjjjjjjj', // Make sure this is valid
  unsigned: true,
}

export const imageUpload = async (image1) => {
  return new Promise((resolve, reject) => {
    upload(cld, {
      file: image1,
      options: options,
      callback: (error, response) => {
        if (error) {
          console.log(error);
          reject(error); // Rejecting the Promise if there's an error
        } else {
          console.log(response?.secure_url);
          resolve(response?.secure_url); // Resolving the Promise with secure_url
        }
      }
    });
  });
};
