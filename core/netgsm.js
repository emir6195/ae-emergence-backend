var axios = require('axios');
var xmljs = require('xml-js');

class Netgsm {
    constructor() {
        this.username = 'username';
        this.password = 'pw';
        this.service_url = 'http://soap.netgsm.com.tr:8080/Sms_webservis/SMS?wsdl';
    }

    async sendSms(header, msg, gsm) {
        var payload_1 = `
<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <SOAP-ENV:Body>
        <ns3:smsGonder1NV2 xmlns:ns3="http://sms/">
            <username>${this.username}</username>
            <password>${this.password}</password>
            <header>${header}</header>
            <msg>${msg}</msg>
`
        var payload_2 = `
            
            <encoding>TR</encoding>
            <filter></filter>
            <startdate></startdate>
            <stopdate></stopdate>
        </ns3:smsGonder1NV2>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
`
        gsm.forEach(element => {
            payload_1 += `<gsm>${element}</gsm>`
        });

        var data = (payload_1 + payload_2).replace('\n', '');
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.service_url,
            headers: {
                'Content-Type': 'text/xml'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                var json_resp = xmljs.xml2json(response.data, {});
                console.log(JSON.stringify(JSON.parse(json_resp), null, 4));
            })
            .catch(function (error) {
                console.log(error);
            });

    }


}


module.exports = Netgsm;