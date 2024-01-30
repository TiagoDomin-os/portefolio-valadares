// FileUploader.js
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

class FileUploader {
  constructor(storage) {
    this.storage = storage;
  }

  uploadFile(file, folder, progressCallback, errorCallback, successCallback) {
    const fileRef = ref(this.storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Monitora o progresso do upload
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progressCallback) progressCallback(progress);
      },
      (error) => {
        // Lidar com erros
        if (errorCallback) errorCallback(error);
      },
      () => {
        // Upload concluído
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (successCallback) successCallback(downloadURL);
        });
      }
    );
  }
}

export default FileUploader;
