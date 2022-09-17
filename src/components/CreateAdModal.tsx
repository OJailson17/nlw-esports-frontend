import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface Game {
	id: string;
	title: string;
}

export const CreateAdModal = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [useVoiceChannel, setUseVoiceChannel] = useState(false);

	const handleCreateAd = async (e: FormEvent) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		console.log(data);

		if (!data.name) {
			return;
		}

		try {
			await axios.post(`http://localhost:8082/games/${data.game}/ads`, {
				name: data.name,
				yearsPlaying: Number(data.yearsPlaying),
				discord: data.discord,
				weekdays: weekDays.map(Number),
				hourStart: data.hourStart,
				hourEnd: data.hourEnd,
				useVoiceChannel,
			});

			alert('Anúncio criado com sucesso');
		} catch (error) {
			console.log(error);
			alert('Erro ao criar o anúncio');
		}
	};

	useEffect(() => {
		axios('http://localhost:8082/games')
			.then(res => {
				setGames(res.data);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<Dialog.Portal>
			<Dialog.DialogOverlay className='bg-black/60 inset-0 fixed' />

			<Dialog.DialogContent className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
				<Dialog.DialogTitle className='text-3xl font-black'>
					Publique um anúncio
				</Dialog.DialogTitle>

				<form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<label htmlFor='game' className='font-semibold'>
							Qual o game?
						</label>
						<select
							name='game'
							id='game'
							className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
							defaultValue=''
						>
							<option
								disabled
								value=''
								className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
							>
								Selecione o game que deseja jogar
							</option>

							{games.map(game => (
								<option key={game.id} value={game.id}>
									{game.title}
								</option>
							))}
						</select>
					</div>

					<div className='flex flex-col gap-2'>
						<label htmlFor='name'>Seu nome (ou nickname)</label>
						<Input
							type='text'
							placeholder='Como te chamam dentro do game?'
							name='name'
							id='name'
						/>
					</div>

					<div className='grid grid-cols-2 gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='yearsPlaying'>Joga a quantos anos?</label>
							<Input
								type='number'
								placeholder='Tudo bem ser ZERO'
								name='yearsPlaying'
								id='yearsPlaying'
							/>
						</div>

						<div className='flex flex-col gap-2'>
							<label htmlFor='discord'>Qual o seu Discord?</label>
							<Input
								type='text'
								placeholder='Usuário#0000'
								name='discord'
								id='discord'
							/>
						</div>
					</div>

					<div className='flex gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='weekDays'>Quando costuma jogar?</label>
							<ToggleGroup.Root
								type='multiple'
								className='grid grid-cols-4 gap-1'
								value={weekDays}
								onValueChange={setWeekDays}
							>
								<ToggleGroup.Item
									value='0'
									title='Domingo'
									className={`w-8 h-8 rounded  ${
										weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
									}`}
								>
									D
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='1'
									title='Segunda'
									className={`w-8 h-8 rounded  ${
										weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
									}`}
								>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='2'
									title='Terça'
									className={`w-8 h-8 rounded  ${
										weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
									}`}
								>
									T
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='3'
									title='Quarta'
									className={`w-8 h-8 rounded  ${
										weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
									}`}
								>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='4'
									title='Quinta'
									className={`w-8 h-8 rounded  ${
										weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
									}`}
								>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='5'
									title='Sexta'
									className={`w-8 h-8 rounded  ${
										weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
									}`}
								>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='6'
									title='Sábado'
									className={`w-8 h-8 rounded  ${
										weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
									}`}
								>
									S
								</ToggleGroup.Item>
							</ToggleGroup.Root>
						</div>

						<div className='flex flex-col gap-2 flex-1'>
							<label htmlFor='hourStart'>Qual horário do dia?</label>
							<div className='grid grid-cols-2 gap-2'>
								<Input
									type='time'
									placeholder='De'
									name='hourStart'
									id='hourStart'
								/>
								<Input
									type='time'
									placeholder='Até'
									name='hourEnd'
									id='hourEnd'
								/>
							</div>
						</div>
					</div>

					<label className='mt-2 flex items-center gap-2 text-sm'>
						<Checkbox.Root
							className='w-6 h-6 p-1 rounded bg-zinc-900'
							checked={useVoiceChannel}
							onCheckedChange={checked => {
								if (checked === true) {
									setUseVoiceChannel(true);
								} else {
									setUseVoiceChannel(false);
								}
							}}
						>
							<Checkbox.Indicator>
								<Check className='w-4 bg-zinc-900h-4 text-emerald-400' />
							</Checkbox.Indicator>
						</Checkbox.Root>
						Costumo me conectar ao chat de voz
					</label>

					<footer className='mt-4 flex justify-end gap-4'>
						<Dialog.DialogClose className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
							Cancelar
						</Dialog.DialogClose>
						<button
							type='submit'
							className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-500'
						>
							<GameController size={24} />
							Encontrar duo
						</button>
					</footer>
				</form>
			</Dialog.DialogContent>
		</Dialog.Portal>
	);
};
