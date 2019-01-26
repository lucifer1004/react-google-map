import React from 'react'
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'

export default ({code, scope}: {code: string; scope: object}) => (
  <div>
    <LiveProvider code={code} scope={scope}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </div>
)
