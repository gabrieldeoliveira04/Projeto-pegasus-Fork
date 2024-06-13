import Fundo_login from '../../../public/Fundo_login.png';


export default function Home() {
  return (
  
      <div className="h-screen flex items-center justify-end bg-cover bg-center" style={{ backgroundImage: `url(${Fundo_login.src})` }}>
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md mr-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuário</label>
              <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" required />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">Entrar</button>
          </form>
        </div>
      </div>
  );
}
