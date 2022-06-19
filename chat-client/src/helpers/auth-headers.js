export default function authAccessHeader () {
  const access = JSON.parse(localStorage.getItem('access'))

  if (access) return { Authorization: 'Bearer ' + access }
  return {}
};
