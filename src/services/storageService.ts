import AsyncStorage from '@react-native-async-storage/async-storage';
import { DadosOficina } from '../types/oficina';
import { Orcamento } from '../types/orcamento';

export type StorageKeyType = {
	orcamentos: Orcamento[];
	ultimoNumero: number;
	oficina: DadosOficina;
};

const KeyPath = (key: keyof StorageKeyType) => `@app:${key}`;

export class StorageService {
	static async set<K extends keyof StorageKeyType>(key: K, value: StorageKeyType[K]) {
		try {
			await AsyncStorage.setItem(KeyPath(key), JSON.stringify(value));
		} catch (error) {
			console.error('Erro ao salvar no AsyncStorage:', error);
		}
	}

	static async get<K extends keyof StorageKeyType>(key: K): Promise<StorageKeyType[K] | null> {
		try {
			const data = await AsyncStorage.getItem(KeyPath(key));
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error('Erro ao buscar no AsyncStorage:', error);
			return null;
		}
	}

	static async clear<K extends keyof StorageKeyType>(key: K) {
		try {
			await AsyncStorage.removeItem(KeyPath(key));
		} catch (error) {
			console.error('Erro ao remover do AsyncStorage:', error);
		}
	}

	static async clearAll() {
		try {
			await AsyncStorage.clear();
		} catch (error) {
			console.error('Erro ao limpar AsyncStorage:', error);
		}
	}
}
