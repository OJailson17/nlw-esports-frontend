import * as Dialog from '@radix-ui/react-dialog';
import './styles/main.css';

import logoImage from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		ads: number;
	};
}

function App() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		axios('http://localhost:8082/games')
			.then(res => {
				setGames(res.data);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
			<img src={logoImage} alt='' />

			<h1 className='text-6xl text-white font-black mt-20'>
				Seu{' '}
				<span className='bg-nlw-gradient text-transparent bg-clip-text'>
					duo
				</span>{' '}
				está aqui.
			</h1>

			<div className='grid grid-cols-6 gap-6 mt-16'>
				{games.map(game => (
					<GameBanner
						key={game.id}
						title={game.title}
						bannerUrl={game.bannerUrl}
						adsCount={game._count.ads}
					/>
				))}
			</div>

			<Dialog.Root>
				<CreateAdModal />
				<CreateAdBanner />
			</Dialog.Root>
		</div>
	);
}

export default App;
