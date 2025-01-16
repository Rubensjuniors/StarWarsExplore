export function createdCard(name, insertElement) {
  const div = document.createElement("div")
  const h2 = document.createElement("h2");

  div.classList.add('bg-gray-200', 'rounded-lg', 'shadow-md', 'p-6', 'w-full', 'cursor-pointer');
  h2.classList.add('text-xl', 'font-semibold', 'text-gray-800')

  h2.innerText = name

  div.appendChild(h2)

  insertElement?.appendChild(div)
}