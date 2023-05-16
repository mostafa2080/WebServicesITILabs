const soap = require('soap');
require('dotenv').config();

// Read the country from the environment variable
const country = process.env.COUNTRY;

// Create a SOAP client
const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
soap.createClient(url, function(err, client) {
  if (err) {
    console.error('Failed to create SOAP client:', err);
    return;
  }

  // Invoke the operations
  client.CapitalCity({ sCountryISOCode: country }, function(err, result) {
    if (err) {
      console.error('Error calling CapitalCity:', err);
      return;
    }
    console.log('Capital City:', result.CapitalCityResult);
  });

  client.CountryCurrency({ sCountryISOCode: country }, function(err, result) {
    if (err) {
      console.error('Error calling CountryCurrency:', err);
      return;
    }
    console.log('Country Currency:', result.CountryCurrencyResult.sISOCode);
    console.log('Currency Name:', result.CountryCurrencyResult.sName);
  });

  client.CountryFlag({ sCountryISOCode: country }, function(err, result) {
    if (err) {
      console.error('Error calling CountryFlag:', err);
      return;
    }
    console.log('Country Flag URL:', result.CountryFlagResult);
  });

  client.CountryIntPhoneCode({ sCountryISOCode: country }, function(err, result) {
    if (err) {
      console.error('Error calling CountryIntPhoneCode:', err);
      return;
    }
    console.log('Country International Phone Code:', result.CountryIntPhoneCodeResult);
  });


  client.LanguageName({ sISOCode: country }, function(err, result) {
    if (err) {
      console.error('Error calling LanguageName:', err);
      return;
    }

    console.log('Language Name:', result.LanguageNameResult);

  });

  client.FullCountryInfo({ sCountryISOCode: country }, function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    
    console.log(result);


});

});
