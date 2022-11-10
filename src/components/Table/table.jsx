import React from 'react';
import { pokemonData } from './pokemon.js';

import {Table as TableAnt, Typography, Image} from 'antd';

const{Text} = Typography;
const columns= [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'fix2',
    render:(text)=> <Text copyable>{text}</Text>,
    filters: [
      {
        text: 'Charmander',
        value: 'Charmander'
      },
      {
        text: 'Caterpie',
        value: 'Caterpie'
      },
    ],
    onFilter: (value, item) => item.name.includes(value)
  },
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'fix3',
  },
  {
    title: 'Class',
    key: 'classification',
    key: 'fix4',
    
   
  },
  {
    title: 'Maximum XP',
    dataIndex: 'maxHP',
    key: 'fix5',
     sorter: (a,b) =>a.maxHP - b.maxHP
  },
  {
    title: 'Maximum CP',
    key: 'maxCP',
    key: 'fix6'
  },
  {
    title: "Image",
    dataIndex:"image",
    key: 'image',
    render: (srcImage)=> <Image src={srcImage} width={150}/>
  }
]

const dataPokemon = pokemonData.map(pokemon=>({
  name: pokemon.name,
  number: pokemon.number,
  classification: pokemon.classification,
  maxCP: pokemon.maxCP,
  maxHP: pokemon.maxHP,
  key: pokemon.id,
  image: pokemon.image
}))

const Table = () => {
	return (
		<TableAnt 
      dataSource={dataPokemon} 
      columns={columns}
      pgination={
        {
          pageSize:50,
        //pageSizeOptions:[20,50,100],
         showSizeChanger: false
      }}>

    </TableAnt>
	);
};

export default Table;