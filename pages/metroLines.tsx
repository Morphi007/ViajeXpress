import React from 'react';
import { ExpressLayout } from '@/components/layout';
import Image from 'next/image';
import metroMap from '@/public/images/icons/metroMap.png'; // Asegúrate de que la ruta a la imagen es correcta
import styles from '@/styles/MetroLines.module.css'; // Importa los estilos CSS desde la carpeta styles

const MetroLines = () => {
  const tableContent1 = (
    <table>
      <thead>
        <tr>
          <th>Línea</th>
          <th>Estaciones</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Centro de los Héroes</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Francisco Alberto Caamaño</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Amin Abel</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Joaquin Balaguer</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Casandra Damiron</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Prof. Juan Borsch</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Juan Pablo Duarte</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Manuel Arturo Peña Batlle</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Pedro Livio Cedeño</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Los tainos</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Maximo Gomez</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Juan Francisco Peña Gomez</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Gregorio Luperon</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Gregorio Urbano Gilbert</td>
          
        </tr>
        <tr>
          <td>1</td>
          <td>Mama Tingo</td>
          
        </tr>
      </tbody>
    </table>
  );

  const tableContent2 = (
    <table>
      <thead>
        <tr>
          <th>Línea</th>
          <th>Estaciones</th>
        
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2</td>
          <td>Concepcion bona</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Trina de Moya de Vásquez</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Ercilia Pepín</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Eduardo Brito</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Manuel de Jesús Abreu Galvan</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Horacio Vásquez</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Ramón Cáceres</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Mauricio Baez</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Coronel Rafael Tomas Fernández</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Juan Pablo Duarte</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Juan Ulises García</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Freddy Beras Goico</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Pedro Mir</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Ulises F. Espaillat</td>
         
        </tr>
        <tr>
          <td>2</td>
          <td>Francisco Gregorio Billini</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Pedro Francisco Bono</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>María Montez</td>
          
        </tr>
      </tbody>
    </table>
  );

  const tableContent3 = (
    <table>
  <thead>
    <tr>
      <th>Línea</th>
      <th>Estaciones</th>
      <th>Tiempo Promedio En minutos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mamá Tingó - Centro de los Héroes</td>
      <td>25</td>
    </tr>
    <tr>
      <td>1</td>
      <td>Juan Pablo Duarte - Mamá Tingó</td>
      <td>15</td>
    </tr>
    <tr>
      <td>1</td>
      <td>Juan Pablo Duarte - Centro de los Héroes</td>
      <td>09</td>
    </tr>
    <tr>
      <td>2</td>
      <td>María Montez - Concepción Bona</td>
      <td>26</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Juan Pablo Duarte - María Montez</td>
      <td>10</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Juan Pablo Duarte - Concepción Bona</td>
      <td>15</td>
    </tr>
  </tbody>
</table>

  );

  return (
    <ExpressLayout title="Líneas del Metro">
      <div className={styles.metroLinesContainer}>
        <h3 className={styles.metroLinesTitle}>Líneas del Metro</h3>
        <p className={styles.metroLinesIntro}>
          Aquí puedes consultar las líneas del metro, incluyendo rutas, horarios y precios.
        </p>
        
        <div className={styles.metroContent}>
          <div className={styles.metroTableContainer}>
            <div className={styles.metroTable}>
              {tableContent1}
            </div>
            <div className={styles.metroTable}>
              {tableContent2}
            </div>
            <div className={styles.metroTable}>
              {tableContent3}
            </div>
          </div>
          
          <div className={styles.metroMap}>
            <Image src={metroMap} alt="Mapa del Metro de Santo Domingo" />
          </div>

          <button className={styles.metroButton}>Comprar tickets</button>
        </div>
      </div>
    </ExpressLayout>
  );
};

export default MetroLines;
