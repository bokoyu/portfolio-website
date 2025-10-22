import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header
      isAdmin={true}
      onLoginClick={() => console.log('Login clicked')}
      onLogoutClick={() => console.log('Logout clicked')}
    />
  );
}