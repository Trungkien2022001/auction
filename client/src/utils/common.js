exports.tryParseJson = (str)=>{
  let obj
   try {
    obj = JSON.parse(str)
   } catch (error) {
    
   }
  return obj
}