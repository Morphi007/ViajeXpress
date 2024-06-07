
import { ExpressLayout } from '@/components/layout';
import {  PaginaPrincipal, SegundaPagina } from '@/components/principal';

export default function Home() {
	return (
		<ExpressLayout title={'viajexpress'}>
			<section id="slider_1" className="">
			<PaginaPrincipal/>
				
			</section>
			<section id="slider_2" className="">
				<SegundaPagina />
			</section>
		</ExpressLayout>
	);
}
