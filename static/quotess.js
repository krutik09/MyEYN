import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactus1');
  console.log("connected")
}