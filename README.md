# aadhar-ocr-ts

## This is a aadhar OCR Engine which provides the json data of a given aadhar card image. 
### While making request, aadhar card image and field which are required must be passed.
```
body {
  name : 'true',
  dob : 'true',
  aadharNo : 'true',
  gender  : 'true',
  photo : 'true'
}
```
#### Available request fields : name (Gives user's name), dob (Give user's dob), aadharNo (Give user's aadhar number), gender (Give user's gender), photo (Give user's photo)
