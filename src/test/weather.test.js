import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

const URL = "http://localhost:5000/api/v1";
let city = "";
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

describe('Weather', function () {
    this.timeout(3000);

    it("Location", function (done) {
        chai.request(URL)
            .get("/location")
            .end(function (err, res) {
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('city');
                chai.expect(JSON.parse(res.text)).to.have.property('region');
                chai.expect(JSON.parse(res.text)).to.have.property('country_name');
                chai.expect(JSON.parse(res.text)).to.have.property('latitude');
                chai.expect(JSON.parse(res.text)).to.have.property('longitude');
                city = JSON.parse(res.text).city;
                done();
            });
    });

    it("Current + city", function (done) {
        chai.request(URL)
            .get("/current/Liniers")
            .end(function (err, res) {
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('weather');
                chai.expect(JSON.parse(res.text)).to.have.property('main');
                chai.expect(JSON.parse(res.text)).to.have.property('name');
                chai.expect(JSON.parse(res.text).name).equal("Liniers");
                done();
            });
    });

    it("Current city not found", function (done) {
        chai.request(URL)
            .get("/current/Lorem test...")
            .end(function (err, res) {
                chai.expect(res.status).to.equal(500);
                chai.expect(res).to.be.json;
                chai.expect(JSON.parse(res.text)).to.have.property('error');
                chai.expect(JSON.parse(res.text).error).equal("City not found.");
                done();
            });
    });

    it("Current no city", function (done) {
        chai.request(URL)
            .get("/current")
            .end(function (err, res) {
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('weather');
                chai.expect(JSON.parse(res.text)).to.have.property('main');
                chai.expect(JSON.parse(res.text)).to.have.property('name');
                let currentCity = removeAccents(JSON.parse(res.text).name);
                chai.expect(currentCity).equal(city);
                done();
            });
    });

    it("forecast + city", function (done) {
        chai.request(URL)
            .get("/forecast/Ramos Mejía")
            .end(function (err, res) {
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('list');
                chai.expect(JSON.parse(res.text)).to.have.property('city');
                chai.expect(JSON.parse(res.text).city).to.have.property('name');
                chai.expect(JSON.parse(res.text).city.name).equal("Ramos Mejía");
                done();
            });
    });

    it("Forecast city not found", function (done) {
        chai.request(URL)
            .get("/forecast/test123123")
            .end(function (err, res) {
                chai.expect(res.status).to.equal(500);
                chai.expect(res).to.be.json;
                chai.expect(JSON.parse(res.text)).to.have.property('error');
                chai.expect(JSON.parse(res.text).error).equal("City not found.");
                done();
            });
    });

    it("Forecast no city", function (done) {
        chai.request(URL)
            .get("/forecast")
            .end(function (err, res) {
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('list');
                chai.expect(JSON.parse(res.text)).to.have.property('city');
                chai.expect(JSON.parse(res.text).city).to.have.property('name');
                let currentCity = removeAccents(JSON.parse(res.text).city.name);
                chai.expect(currentCity).equal(city);
                done();
            });
    });

    after(function (done) {
        done();
    });

});