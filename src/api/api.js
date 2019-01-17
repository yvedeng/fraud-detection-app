function dispatchCall(url, opts) {
    return fetch(url, opts)
        .then((response) => {
            if (parseInt(response.status) >= 300 || response.status < 200) {
                return response.text().then(error => {
                    console.log(error)
                    throw(error)});
            }
            if (response.status === 204) {
                return null;
            }
            return response.json();
      });
  }
  

export default class Api {
    static post(url='', data=null){
        console.log(JSON.stringify(data))
        return dispatchCall(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        });
    }

    static put(url='', data=null){
        return dispatchCall(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        });
    }

    static get(url=''){
        return dispatchCall(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}




