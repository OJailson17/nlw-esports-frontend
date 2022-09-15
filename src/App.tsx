import * as Dialog from '@radix-ui/react-dialog';
import './styles/main.css';

import logoImage from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';

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
		fetch('http://localhost:8082/games')
			.then(res => res.json())
			.then(data => {
				setGames(data);
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
				<Dialog.Portal>
					<Dialog.DialogOverlay className='bg-black/60 inset-0 fixed' />

					<Dialog.DialogContent className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
						<Dialog.DialogTitle className='text-3xl font-black'>
							Publique um anúncio
						</Dialog.DialogTitle>

						<form className='mt-8 flex flex-col gap-4'>
							<div className='flex flex-col gap-2'>
								<label htmlFor='game' className='font-semibold'>
									Qual o game?
								</label>
								<Input
									placeholder='Selecione o game que deseja jogar'
									id='game'
								/>
							</div>

							<div className='flex flex-col gap-2'>
								<label htmlFor='name'>Seu nome (ou nickname)</label>
								<Input
									type='text'
									placeholder='Como te chamam dentro do game?'
									id='name'
								/>
							</div>

							<div className='grid grid-cols-2 gap-6'>
								<div className='flex flex-col gap-2'>
									<label htmlFor='yearsPlaying'>Joga a quantos anos?</label>
									<Input
										type='number'
										placeholder='Tudo bem ser ZERO'
										id='yearsPlaying'
									/>
								</div>

								<div className='flex flex-col gap-2'>
									<label htmlFor='discord'>Qual o seu Discord?</label>
									<Input type='text' placeholder='Usuário#0000' id='discord' />
								</div>
							</div>

							<div className='flex gap-6'>
								<div className='flex flex-col gap-2'>
									<label htmlFor='weekDays'>Quando costuma jogar?</label>
									<div className='grid grid-cols-4 gap-1'>
										<button
											title='Domingo'
											className='w-8 h-8 rounded bg-zinc-900'
										>
											D
										</button>
										<button
											title='Segunda'
											className='w-8 h-8 rounded bg-zinc-900'
										>
											S
										</button>
										<button
											title='Terça'
											className='w-8 h-8 rounded bg-zinc-900'
										>
											T
										</button>
										<button
											title='Quarta'
											className='w-8 h-8 rounded bg-zinc-900'
										>
											Q
										</button>
										<button
											title='Quinta'
											className='w-8 h-8 rounded bg-zinc-900'
										>
											Q
										</button>
										<button
											title='Sexta'
											className='w-8 h-8 rounded bg-zinc-900'
										>
											S
										</button>
										<button
											title='Sábado'
											className='w-8 h-8 rounded bg-zinc-900'
										>
											S
										</button>
									</div>
								</div>

								<div className='flex flex-col gap-2 flex-1'>
									<label htmlFor='hourStart'>Qual horário do dia?</label>
									<div className='grid grid-cols-2 gap-2'>
										<Input type='time' placeholder='De' id='hourStart' />
										<Input type='time' placeholder='Até' id='hourEnd' />
									</div>
								</div>
							</div>

							<div className='mt-2 flex gap-2 text-sm'>
								<Input type='checkbox' />
								Costumo me conectar ao chat de voz
							</div>

							<footer className='mt-4 flex justify-end gap-4'>
								<Dialog.DialogClose className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
									Cancelar
								</Dialog.DialogClose>
								<button
									type='submit'
									className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
								>
									<GameController size={24} />
									Encontrar duo
								</button>
							</footer>
						</form>
					</Dialog.DialogContent>
				</Dialog.Portal>

				<CreateAdBanner />
			</Dialog.Root>
		</div>
	);
}

export default App;
