export default function Footer() {
  return (
    <footer className="bg-transparent text-white py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-baumans font-bold mb-2">Tea & TALES</h2>
          <p className="mb-5">
            "Sip your tea, turn a page—Tea & Tales is your cozy escape to read
            and download dreamy books!"
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <svg
                className="w-5 h-5 fill-white hover:fill-gray-400"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg
                className="w-5 h-5 fill-white hover:fill-gray-400"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.5.5.6.3 1 .6 1.5 1.1.5.5.8.9 1.1 1.5.2.5.4 1.3.5 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.5-.3.6-.6 1-1.1 1.5-.5.5-.9.8-1.5 1.1-.5.2-1.3.4-2.5.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.5-.5-.6-.3-1-.6-1.5-1.1-.5-.5-.8-.9-1.1-1.5-.2-.5-.4-1.3-.5-2.5-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-2 .5-2.5.3-.6.6-1 1.1-1.5.5-.5.9-.8 1.5-1.1.5-.2 1.3-.4 2.5-.5 1.3-.1 1.7-.1 4.9-.1zm0 2c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4s-.7.4-1 .7c-.3.3-.5.6-.7 1s-.3 1-.4 2c-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.4.4.7.7 1 .3.3.6.5 1 .7.4.2 1 .3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4s.7-.4 1-.7c.3-.3.5-.6.7-1 .2-.4.3-1 .4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2s-.4-.7-.7-1c-.3-.3-.6-.5-1-.7-.4-.2-1-.3-2-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.8a6 6 0 110 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8zm5.5-2.9a1.3 1.3 0 11-2.6 0 1.3 1.3 0 012.6 0z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg
                className="w-5 h-5 fill-white hover:fill-gray-400"
                viewBox="0 0 24 24"
              >
                <path d="M20.5 2H3.5C2.7 2 2 2.7 2 3.5v17C2 21.3 2.7 22 3.5 22h17c.8 0 1.5-.7 1.5-1.5v-17c0-.8-.7-1.5-1.5-1.5zM8.3 18.3H5.8V9h2.5v9.3zM7 7.8C6 7.8 5.3 7 5.3 6c0-1 .8-1.8 1.7-1.8S8.7 5 8.7 6c0 1-.8 1.8-1.7 1.8zm11.3 10.5h-2.5v-4.5c0-1.1-.4-1.8-1.3-1.8s-1.4.6-1.6 1.2c-.1.2-.1.5-.1.8v4.3h-2.5V9h2.5v1.3c.3-.5 1.1-1.3 2.5-1.3 1.9 0 3.1 1.2 3.1 3.8v5.5z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Intro</h3>
          <ul className="flex flex-col gap-3">
            <li className="whitespace-nowrap">
              <a href="#">About Us</a>
            </li>
            <li className="whitespace-nowrap">
              <a href="#">Our Partners</a>
            </li>
            <li className="whitespace-nowrap">
              <a href="#">All Publishers</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Why Tea & Tales?</h3>
          <ul className="flex flex-col gap-3">
            <li className="whitespace-nowrap">
              <a href="#">FAQ</a>
            </li>
            <li className="whitespace-nowrap">
              <a href="#">Authors</a>
            </li>
            <li className="whitespace-nowrap">
              <a href="#">Books</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center whitespace-nowrap">
              <svg className="w-4 h-4 mr-2" fill="white" viewBox="0 0 24 24">
                <path d="M3 5.8C3 15.5 8.5 21 18.2 21c1.1 0 2-.9 2-2v-2.2c0-.5-.4-1-.9-1l-3.3-.4c-.4 0-.8.2-1 .6l-1.3 2c-2.6-.7-4.8-2.9-5.5-5.5l2-1.3c.4-.2.6-.6.6-1L8.2 5.9c0-.5-.4-.9-1-.9H5c-.6 0-1 .5-1 1z" />
              </svg>
              01400-000000
            </li>
            <li className="flex items-center whitespace-nowrap">
              <svg className="w-4 h-4 mr-2" fill="white" viewBox="0 0 24 24">
                <path d="M20 4H4c-1 0-2 .8-2 2v12c0 1.1.9 2 2 2h16c1.2 0 2-.9 2-2V6c0-1.2-.8-2-2-2zm0 2v.5L12 13 4 6.5V6h16zM4 18V8l8 6 8-6v10H4z" />
              </svg>
              info@teatales.com
            </li>
            <li className="flex items-center whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 -960 960 960"
                width="48px"
                fill="#FFFFFF"
                className="w-4 h-4 mr-2"
              >
                <path d="M480.09-490q28.91 0 49.41-20.59 20.5-20.59 20.5-49.5t-20.59-49.41q-20.59-20.5-49.5-20.5t-49.41 20.59q-20.5 20.59-20.5 49.5t20.59 49.41q20.59 20.5 49.5 20.5ZM480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z" />
              </svg>
              116 Rd No-9, Dhaka 1212
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
