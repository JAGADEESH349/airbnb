const mongoose=require("mongoose");
const Data=require("./data.js");
const Listing=require("../Models/Listing.js");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main().then(()=>{
console.log("mongoose connected");
})
.catch((err)=>{
    console.log(err);
})

const initDB=async ()=>{
    await  Listing.deleteMany({});
    console.log("deleted all the data");
    Data.data=Data.data.map((obj)=>({...obj,owner:"6a633e1f96ad94ac0ec290b6"}));
    await Listing.insertMany(Data.data);
    console.log("inserted all the data");
};

initDB();

