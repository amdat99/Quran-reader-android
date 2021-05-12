 export const  updateCounter = async (status) => { 

 try {

    const response = await fetch('http://192.168.11.177:3000/usercounter',{
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: status,

      }),
    }
  );
  const data =  await response.json();
  console.log('counter updated',data);

}catch(e) {
    console.log('update user count error',e)
}
 }