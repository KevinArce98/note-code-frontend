import { Redirect, Route, Switch } from 'wouter';
import { Home } from './pages';
import { LoadingProvider } from './context';

export const NoteCode = () => {
  return (
    <LoadingProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/:codeId" component={Home} />

        {/* Default route in a switch */}
        <Route component={() => <Redirect href="/" />} />
      </Switch>
    </LoadingProvider>
  );
};
