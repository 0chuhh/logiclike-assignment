import { Routing } from 'routes';
import './index.scss'

import { withProviders } from "./providers";

const App = withProviders(() => {
  return (
    <div className="app">
      <Routing/>
    </div>
  )
});

export default App