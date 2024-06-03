

export function Video() {
  return (
    
<div className="h-full w-full overflow-y-hidden absolute top-0 left-0">
{/* Video para dispositivos móviles */}
<video className="block sm:hidden h-full w-full object-cover" src={require('../../asset/bracgraoundMobile.webm')} autoPlay muted loop />
{/* Video para dispositivos de escritorio */}
<video className="hidden sm:block h-full w-full object-cover " src={require('../../asset/backgraoung.webm')} autoPlay muted loop />

</div>
  );
}