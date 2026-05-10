import fetch from 'node-fetch';

async function testApi() {
  try {
    const res = await fetch('http://localhost:3000/api/partners');
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Body:", text);
  } catch (err) {
    console.error(err);
  }
}

testApi();
