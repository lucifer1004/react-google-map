rm -rf build doc && \
yarn build && \
yarn styleguide:build && \
now --token $NOW_TOKEN && \
now alias --token $NOW_TOKEN && \
now remove react-google-map --safe -y --token $NOW_TOKEN