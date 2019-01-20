# react-gmap

To make Google Map API calls, first you need to apply for a Google Map API key.

## Using the package

```javascript
import {MapBox} from 'react-gmap'

// In your component
return <MapBox apiKey="Your Google Map API key" />
```

## Run the example project

```sh
git clone https://github.com/lucifer1004/react-gmap
cd react-gmap
yarn install
```

You should copy the sample dotenv file, and fill in your Google Map API key to
replace the placeholder.

```sh
cp .env.sample .env
```

Then you can run the example project by

```sh
yarn start
```
