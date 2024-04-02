

export default async function handler(req, res) {
    const info = {
        email: req.body.email,
        password : req.body.password
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    });
    const data = await response.json();
    res.send(data);
}