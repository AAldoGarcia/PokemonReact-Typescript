import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Iconos para menú móvil
import logo from '../assets/859e0396b1c628832ba6b7c47c4a95b5.jpg';   // ⚠️ Ajusta la ruta a tu imagen real

// Definimos los enlaces aquí para no repetir código
const navigation = [
  { name: 'Inicio', href: '#', current: true },
  { name: 'Pokédex', href: '#', current: false },
  { name: 'Equipo', href: '#', current: false },
  { name: 'Captura', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              {/* BOTÓN MENÚ MÓVIL (Izquierda) */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir menú principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* LOGO Y ENLACES DE ESCRITORIO (Centro/Derecha) */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                
                {/* LOGO */}
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-auto transition-transform hover:scale-110 duration-300 cursor-pointer"
                    src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" // Usé este online como ejemplo, cambia por tu 'logo.png'
                    alt="PokeApp Logo"
                  />
                </div>

                {/* ENLACES (Solo visibles en Desktop 'sm:block') */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current 
                            ? 'bg-gray-900 text-white border-b-2 border-red-500' 
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-b-2 hover:border-red-400',
                          'px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 border-transparent'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* PARTE DERECHA (Avatar o Botón de Login - Opcional) */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                    {/* Aquí podrías poner un icono de usuario o pokebola */}
                    <span className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shadow-lg border-2 border-gray-600">
                        Ash
                    </span>
                </div>
              </div>
            </div>
          </div>

          {/* MENÚ MÓVIL (Animado) */}
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current 
                        ? 'bg-gray-900 text-white border-l-4 border-red-500' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-r-md px-3 py-2 text-base font-medium transition-colors'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}