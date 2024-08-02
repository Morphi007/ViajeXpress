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
          <th>Tiempo Promedio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Centro de los Héroes</td>
          <td>5</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Francisco Alberto Caamaño</td>
          <td>6</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Amin Abel</td>
          <td>7</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Joaquin Balaguer</td>
          <td>4</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Casandra Damiron</td>
          <td>5</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Prof. Juan Borsch</td>
          <td>4</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Juan Pablo Duarte</td>
          <td>4</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Manuel Arturo Peña Batlle</td>
          <td>5</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Pedro Livio Cedeño</td>
          <td>4</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Los tainos</td>
          <td>6</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Maximo Gomez</td>
          <td>7</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Juan Francisco Peña Gomez</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Gregorio Luperon</td>
          <td>5</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Gregorio Urbano Gilbert</td>
          <td>4</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Mama Tingo</td>
          <td>3</td>
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
          <th>Tiempo Promedio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2</td>
          <td>Concepcion bona</td>
          <td>5</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Trina de Moya de Vásquez</td>
          <td>6</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Ercilia Pepín</td>
          <td>7</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Eduardo Brito</td>
          <td>4</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Manuel de Jesús Abreu Galvan</td>
          <td>5</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Horacio Vásquez</td>
          <td>4</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Ramón Cáceres</td>
          <td>4</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Mauricio Baez</td>
          <td>5</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Coronel Rafael Tomas Fernández</td>
          <td>4</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Juan Pablo Duarte</td>
          <td>6</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Juan Ulises García</td>
          <td>7</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Freddy Beras Goico</td>
          <td>3</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Pedro Mir</td>
          <td>5</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Ulises F. Espaillat</td>
          <td>4</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Francisco Gregorio Billini</td>
          <td>3</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Pedro Francisco Bono</td>
          <td>3</td>
        </tr>
        <tr>
          <td>2</td>
          <td>María Montez</td>
          <td>3</td>
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
