import AsyncStorage from '@react-native-async-storage/async-storage';

// Define todas as chaves possíveis e seus tipos
export type StorageKeyType = {
	// aqui vai as chaves e seus tipos, por exemplo:
	// userToken: string;
	// userPreferences: {
	// 	theme: 'light' | 'dark';
	// };
};

// Função auxiliar para padronizar o caminho da chave
const KeyPath = (key: keyof StorageKeyType) => `@app:${key}`;

export class StorageService {
	// Salvar dado
	static async set<K extends keyof StorageKeyType>(key: K, value: StorageKeyType[K]) {
		try {
			await AsyncStorage.setItem(KeyPath(key), JSON.stringify(value));
		} catch (error) {
			console.error('Erro ao salvar no AsyncStorage:', error);
		}
	}

	// Buscar dado
	static async get<K extends keyof StorageKeyType>(key: K): Promise<StorageKeyType[K] | null> {
		try {
			const data = await AsyncStorage.getItem(KeyPath(key));
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error('Erro ao buscar no AsyncStorage:', error);
			return null;
		}
	}

	// Remover dado
	static async clear<K extends keyof StorageKeyType>(key: K) {
		try {
			await AsyncStorage.removeItem(KeyPath(key));
		} catch (error) {
			console.error('Erro ao remover do AsyncStorage:', error);
		}
	}

	// Limpar tudo (opcional)
	static async clearAll() {
		try {
			await AsyncStorage.clear();
		} catch (error) {
			console.error('Erro ao limpar AsyncStorage:', error);
		}
	}
}
