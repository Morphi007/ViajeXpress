import { ExpressLayout } from '@/components/layout';
import { AboutUs } from '@/components/ui'; // Importa el componente AboutUs

export default function Home() {
	return (
		<ExpressLayout title={'ViajeXpress'}>
			<div>
				<AboutUs /> 
			</div>
		</ExpressLayout>
	);
}
