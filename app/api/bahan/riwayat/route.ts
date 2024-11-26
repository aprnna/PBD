import getResponse from '@/utils/getResponse'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET() {
  try {
    const dataRiwayat = await prisma.mengelola_Bahan.findMany({
      include: {
        user: true, 
        bahan_baku: true, 
      },
    })

    // Map data untuk menyusun respons
    const data = dataRiwayat.map((riwayat) => ({
      nama_user: riwayat.user.nama,
      jumlah: riwayat.jumlah,
      createdAt: riwayat.createdAt,
      proses: riwayat.proses,
      nama_bahan: riwayat.bahan_baku.nama,
    }))

    return getResponse(data, 'Bahan Baku fetched successfully', 200)
  } catch (error) {
    console.error('Error fetching data:', error)

    return getResponse(error, 'Failed to fetch data', 500)
  }
}