export default function checkLogin({to,router}){
	console.log('to.mame= ',to.name)
	return router.push({ name: 'Login' });
}