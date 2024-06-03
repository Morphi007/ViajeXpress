import { ExpressLayout } from '@/components/layout';
import { PaginaPrincipal } from '@/components/principal/PaginaPrincipal';

export default function Home() {
	return (
		<ExpressLayout title={'viajexpress'}>
			
			<section id="slider_1" className="">
			<PaginaPrincipal/>

			</section>
			
		</ExpressLayout>
	);
}
