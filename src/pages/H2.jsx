import React, { useState } from "react";
import { Link } from "react-router-dom";

function H2() {

    return(

        <div className="bg-black">
            
            <button 
                data-drawer-target="sidebar-multi-level-sidebar" 
                data-drawer-toggle="sidebar-multi-level-sidebar" 
                aria-controls="sidebar-multi-level-sidebar" 
                type="button" 
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

    <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 w-100 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-lg" aria-label="Sidebar">
        <div class="h-full px-3 py-10 overflow-y-auto bg-white">
            <ul class="space-y-20 font-medium">
                <li>
                <div class="p-2">
        <div class="relative h-10 w-full min-w-[200px]">
        <div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </svg>
        </div>
        <input
            class="peer h-full w-full rounded-full shadow-lg border border-black/50 border-t-transparent bg-transparent px-3 py-2.5 
            !pr-9 font-sans text-sm font-normal text-blue-black transition-all"
            placeholder=" " />
        </div>
    </div>
  <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
    <div class="relative block w-full">
      <div role="button"
        class="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        <button type="button"
          class="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
          </button>
          </div>
          </div>
          </nav>





              {/***** */} 
            </li>
         <li>
         <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-[#E0E0E0]">
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
               <span class="ms-3 text-black">-----</span>
            </a>
         </li>
         </ul>
         </li>
      </ul>
      <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-[#E0E0E0]">
        <button type="button" class="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-[#E0E0E0] dark:text-black" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-black dark:group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span class="flex-1 ms-3 text-black text-left rtl:text-right whitespace-nowrap">Información</span>
                    <svg class="w-3 h-3 transition duration-75 group-hover:text-gray-900 dark:text-black dark:group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
         
         <li>
            <Link to="/community">
            <a href="#" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-[#E0E0E0] dark:text-black group">
               <svg class="shrink-0 w-6 h-6 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" >
                  <path d="M21.821 12.43c-.083-.119-2.062-2.944-4.793-4.875-1.416-1.003-3.202-1.555-5.028-1.555-1.825 0-3.611.552-5.03 1.555-2.731 1.931-4.708 4.756-4.791 4.875-.238.343-.238.798 0 1.141.083.119 2.06 2.944 4.791 4.875 1.419 1.002 3.205 1.554 5.03 1.554 1.826 0 3.612-.552 5.028-1.555 2.731-1.931 4.71-4.756 4.793-4.875.239-.342.239-.798 0-1.14zm-9.821 4.07c-1.934 0-3.5-1.57-3.5-3.5 0-1.934 1.566-3.5 3.5-3.5 1.93 0 3.5 1.566 3.5 3.5 0 1.93-1.57 3.5-3.5 3.5zM14 13c0 1.102-.898 2-2 2-1.105 0-2-.898-2-2 0-1.105.895-2 2-2 1.102 0 2 .895 2 2z"/>
               </svg>
               <span class="ms-3 text-black">Ver Reportes</span>
            </a>
            </Link>
         </li>
         </ul>
         </div>
    </aside>
    <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-full z-40 w-100 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-lg" aria-label="Sidebar">
        <div class="h-full px-0 py-10 overflow-y-auto bg-white">
         <button className="absolute bottom-10 right-4 bg-white p-2 rounded shadow-lg">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </button>

        {/* Botón de Zoom Out */}
        <button className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-lg">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            ></path>
          </svg>
        </button>
        </div>
        </aside>



        </div>
    );

}export default H2;