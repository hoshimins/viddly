"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Video, 
  MessageSquare, 
  Heart,
  Tags,
  BarChart3,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const stats = [
    { label: "総ユーザー数", value: "1,234", icon: Users, color: "text-blue-500" },
    { label: "総動画数", value: "567", icon: Video, color: "text-green-500" },
    { label: "総コメント数", value: "8,901", icon: MessageSquare, color: "text-purple-500" },
    { label: "総いいね数", value: "23,456", icon: Heart, color: "text-red-500" },
  ]

  const mockUsers = [
    { id: 1, name: "田中太郎", createdAt: "2024-01-15", videos: 12, comments: 45 },
    { id: 2, name: "佐藤花子", createdAt: "2024-02-20", videos: 8, comments: 23 },
    { id: 3, name: "山田次郎", createdAt: "2024-03-10", videos: 15, comments: 67 },
  ]

  const mockVideos = [
    { id: 1, title: "サンプル動画1", uploader: "田中太郎", createdAt: "2024-12-01", likes: 123, comments: 45 },
    { id: 2, title: "テスト動画2", uploader: "佐藤花子", createdAt: "2024-12-05", likes: 89, comments: 23 },
    { id: 3, title: "デモ動画3", uploader: "山田次郎", createdAt: "2024-12-10", likes: 156, comments: 34 },
  ]

  const mockComments = [
    { id: 1, text: "素晴らしい動画です！", user: "田中太郎", video: "サンプル動画1", createdAt: "2024-12-10" },
    { id: 2, text: "参考になりました", user: "佐藤花子", video: "テスト動画2", createdAt: "2024-12-11" },
    { id: 3, text: "もっと見たいです", user: "山田次郎", video: "デモ動画3", createdAt: "2024-12-12" },
  ]

  const mockTags = [
    { id: 1, name: "技術", count: 45 },
    { id: 2, name: "エンターテイメント", count: 32 },
    { id: 3, name: "教育", count: 28 },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-lg border card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border card-shadow">
          <h3 className="text-lg font-semibold mb-4">最近のアクティビティ</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded">
              <span className="text-sm">新規ユーザー登録: 田中太郎</span>
              <span className="text-xs text-muted-foreground">2時間前</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded">
              <span className="text-sm">動画投稿: サンプル動画1</span>
              <span className="text-xs text-muted-foreground">4時間前</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded">
              <span className="text-sm">コメント投稿: 素晴らしい動画です！</span>
              <span className="text-xs text-muted-foreground">6時間前</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border card-shadow">
          <h3 className="text-lg font-semibold mb-4">人気の動画</h3>
          <div className="space-y-3">
            {mockVideos.slice(0, 3).map((video) => (
              <div key={video.id} className="flex items-center justify-between p-3 bg-muted rounded">
                <div>
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-muted-foreground">by {video.uploader}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Heart className="h-3 w-3" />
                  {video.likes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ユーザー管理</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規ユーザー
        </Button>
      </div>
      
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="ユーザーを検索..." className="pl-10" />
        </div>
      </div>
      
      <div className="bg-card rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">ユーザー名</th>
                <th className="px-6 py-3 text-left text-sm font-medium">登録日</th>
                <th className="px-6 py-3 text-left text-sm font-medium">動画数</th>
                <th className="px-6 py-3 text-left text-sm font-medium">コメント数</th>
                <th className="px-6 py-3 text-left text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.createdAt}</td>
                  <td className="px-6 py-4 text-sm">{user.videos}</td>
                  <td className="px-6 py-4 text-sm">{user.comments}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderVideos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">動画管理</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規動画
        </Button>
      </div>
      
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="動画を検索..." className="pl-10" />
        </div>
      </div>
      
      <div className="bg-card rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">タイトル</th>
                <th className="px-6 py-3 text-left text-sm font-medium">投稿者</th>
                <th className="px-6 py-3 text-left text-sm font-medium">投稿日</th>
                <th className="px-6 py-3 text-left text-sm font-medium">いいね</th>
                <th className="px-6 py-3 text-left text-sm font-medium">コメント</th>
                <th className="px-6 py-3 text-left text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {mockVideos.map((video) => (
                <tr key={video.id} className="border-b hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm">{video.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{video.title}</td>
                  <td className="px-6 py-4 text-sm">{video.uploader}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{video.createdAt}</td>
                  <td className="px-6 py-4 text-sm">{video.likes}</td>
                  <td className="px-6 py-4 text-sm">{video.comments}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderComments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">コメント管理</h2>
      </div>
      
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="コメントを検索..." className="pl-10" />
        </div>
      </div>
      
      <div className="bg-card rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">コメント</th>
                <th className="px-6 py-3 text-left text-sm font-medium">ユーザー</th>
                <th className="px-6 py-3 text-left text-sm font-medium">動画</th>
                <th className="px-6 py-3 text-left text-sm font-medium">投稿日</th>
                <th className="px-6 py-3 text-left text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {mockComments.map((comment) => (
                <tr key={comment.id} className="border-b hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm">{comment.id}</td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{comment.text}</td>
                  <td className="px-6 py-4 text-sm">{comment.user}</td>
                  <td className="px-6 py-4 text-sm">{comment.video}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{comment.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderTags = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">タグ管理</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規タグ
        </Button>
      </div>
      
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="タグを検索..." className="pl-10" />
        </div>
      </div>
      
      <div className="bg-card rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">タグ名</th>
                <th className="px-6 py-3 text-left text-sm font-medium">使用回数</th>
                <th className="px-6 py-3 text-left text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {mockTags.map((tag) => (
                <tr key={tag.id} className="border-b hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm">{tag.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{tag.name}</td>
                  <td className="px-6 py-4 text-sm">{tag.count}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return renderDashboard()
      case "users": return renderUsers()
      case "videos": return renderVideos()
      case "comments": return renderComments()
      case "tags": return renderTags()
      default: return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 bg-card border-r min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
              Viddly Admin
            </h1>
          </div>
          
          <nav className="px-4 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "dashboard" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              ダッシュボード
            </button>
            
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "users" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Users className="h-4 w-4" />
              ユーザー管理
            </button>
            
            <button
              onClick={() => setActiveTab("videos")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "videos" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Video className="h-4 w-4" />
              動画管理
            </button>
            
            <button
              onClick={() => setActiveTab("comments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "comments" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              コメント管理
            </button>
            
            <button
              onClick={() => setActiveTab("tags")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "tags" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Tags className="h-4 w-4" />
              タグ管理
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Settings className="h-4 w-4" />
              設定
            </button>
          </nav>
        </aside>
        
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}